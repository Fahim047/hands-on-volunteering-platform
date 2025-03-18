import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks';
import { getCommentsByHelpRequestId, postComment } from '@/lib/queries';
import { useQuery } from '@tanstack/react-query';
import { Reply, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// Separate component to handle the comments and replies logic
const Comments = ({ helpRequestId }) => {
	const { user } = useAuth();
	const [commentText, setCommentText] = useState('');
	const [replyTexts, setReplyTexts] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [replyingTo, setReplyingTo] = useState(null);

	const {
		data: comments,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['help-request', helpRequestId, 'comments'],
		queryFn: () => getCommentsByHelpRequestId(helpRequestId),
	});
	console.log(comments);

	const handleSubmitComment = async () => {
		if (commentText.trim() === '') return;
		setIsSubmitting(true);
		try {
			const newComment = {
				text: commentText,
				author: user._id,
			};
			const res = await postComment(helpRequestId, newComment);
			if (res.status) {
				toast.success(res?.messsage || 'Comment submitted successfully!');
				setCommentText('');
			}
		} catch (error) {
			console.error(error);
			toast.error('Could not submit comment. Please try again!');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleReply = (commentId) => {
		setReplyingTo(replyingTo === commentId ? null : commentId);
	};

	const handleSubmitReply = async (commentId) => {
		if (!replyTexts[commentId] || replyTexts[commentId].trim() === '') return;

		setIsSubmitting(true);
		await new Promise((resolve) => setTimeout(resolve, 500));

		console.log(
			'Reply submitted to comment ID:',
			commentId,
			'Reply:',
			replyTexts[commentId]
		);

		setReplyTexts((prev) => ({ ...prev, [commentId]: '' }));
		setReplyingTo(null);
		setIsSubmitting(false);
	};

	const handleReplyTextChange = (commentId, text) => {
		setReplyTexts((prev) => ({ ...prev, [commentId]: text }));
	};

	if (isPending) return <div>Loading...</div>;
	if (isError) return <div>Something went wrong</div>;

	return (
		<div className="mb-6">
			<h2 className="font-medium text-lg mb-4">Comments ({comments.length})</h2>

			{comments.length > 0 ? (
				<div className="space-y-4">
					{comments.map((comment) => (
						<div key={comment.id}>
							{/* Main comment */}
							<div className="bg-gray-50 rounded-lg p-4">
								<div className="flex items-start gap-3">
									<Avatar className="size-8">
										<AvatarImage src={comment.author.avatar} alt="" />
										<AvatarFallback>
											{comment.author.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div className="flex-1">
										<div className="flex justify-between items-center mb-1">
											<p className="font-medium">{comment.author.name}</p>
										</div>
										<p className="text-gray-700 mb-3">{comment.text}</p>
										<div className="flex items-center gap-2">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => toast.info('Not implemented yet!')}
												className="text-gray-500 hover:text-gray-700 p-0 h-auto"
											>
												<ThumbsUp className="size-4 mr-1" />
												Like
											</Button>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleReply(comment.id)}
												className="text-gray-500 hover:text-gray-700 p-0 h-auto"
											>
												<Reply className="size-4 mr-1" />
												Reply
											</Button>
										</div>
									</div>
								</div>
							</div>

							{/* Replies container */}
							{(comment.replies.length > 0 || replyingTo === comment.id) && (
								<div className="mt-1 pl-6 border-l border-gray-200">
									{/* Existing replies */}
									{comment.replies.map((reply) => (
										<div
											key={reply.id}
											className="mt-2 pt-2 bg-gray-50 rounded-lg p-3"
										>
											<div className="flex items-start gap-2">
												<Avatar className="size-6">
													<AvatarImage src={reply.author.avatar} alt="" />
													<AvatarFallback>
														{reply.author.name.charAt(0)}
													</AvatarFallback>
												</Avatar>
												<div>
													<p className="font-medium text-sm">
														{reply.author.name}
													</p>
													<p className="text-gray-600 text-sm">{reply.text}</p>
												</div>
											</div>
										</div>
									))}

									{/* Reply form */}
									{replyingTo === comment.id && (
										<div className="mt-2 p-3 bg-white rounded-lg border border-gray-100">
											<Textarea
												placeholder="Write your reply..."
												value={replyTexts[comment.id] || ''}
												onChange={(e) =>
													handleReplyTextChange(comment.id, e.target.value)
												}
												className="min-h-[80px] mb-2 bg-white resize-none text-sm"
											/>
											<div className="flex gap-2 justify-end">
												<Button
													variant="outline"
													size="sm"
													onClick={() => setReplyingTo(null)}
													className="text-xs"
												>
													Cancel
												</Button>
												<Button
													size="sm"
													onClick={() => handleSubmitReply(comment.id)}
													disabled={
														isSubmitting ||
														!replyTexts[comment.id] ||
														replyTexts[comment.id].trim() === ''
													}
													className="text-xs"
												>
													{isSubmitting ? 'Submitting...' : 'Reply'}
												</Button>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					))}
				</div>
			) : (
				<p className="text-gray-500">No comments yet.</p>
			)}

			{/* Comment Form */}
			<div className="mt-6">
				<Textarea
					placeholder="Write your comment here..."
					value={commentText}
					onChange={(e) => setCommentText(e.target.value)}
					className="min-h-[100px] mb-4 resize-none"
				/>
				<Button
					onClick={handleSubmitComment}
					disabled={isSubmitting || commentText.trim() === ''}
				>
					{isSubmitting ? 'Submitting...' : 'Submit'}
				</Button>
			</div>
		</div>
	);
};

export default Comments;
