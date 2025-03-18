import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks';
import { formatTimestamp } from '@/lib/datetime-utils';
import { postReply } from '@/lib/queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Reply, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const CommentItem = ({
	comment,
	level = 0,
	onReply,
	parentId = null,
	maxLevel = 3, // Limit nesting levels for better UI
}) => {
	console.log(comment);
	const [showReplyForm, setShowReplyForm] = useState(false);
	const [showReplies, setShowReplies] = useState(level < 2);
	const [replyText, setReplyText] = useState('');
	const { user } = useAuth();
	const queryClient = useQueryClient();

	// Mutation for submitting a reply
	const { mutate: submitReply, isPending: isSubmitting } = useMutation({
		mutationFn: () =>
			postReply(comment.id, {
				text: replyText,
				author: user._id,
				parentComment: parentId || comment.id,
			}),
		onSuccess: () => {
			toast.success('Reply submitted successfully!');
			setReplyText('');
			setShowReplyForm(false);
			queryClient.invalidateQueries([
				'help-request',
				comment.helpRequest,
				'comments',
			]); // Refresh comments
		},
		onError: () => {
			toast.error('Could not submit reply. Please try again!');
		},
	});

	const handleReplyClick = () => {
		setShowReplyForm((prev) => !prev);
		if (onReply) onReply(comment.id);
	};

	return (
		<div
			className={`comment-container mt-3 ${
				level > 0 ? 'pl-4 border-l border-gray-200 ml-8' : ''
			}`}
		>
			{/* Comment UI */}
			<div className="rounded-lg p-3">
				<div className="flex items-start gap-3">
					<Avatar className="size-8">
						<AvatarImage src={comment.author.avatar} alt="" />
						<AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
					</Avatar>

					<div className="flex-1">
						<div className="bg-gray-50 p-2 rounded-md">
							<div className="flex justify-between items-center mb-1">
								<p className="font-medium">{comment.author.name}</p>
								<span className="text-xs text-gray-500">
									{formatTimestamp(comment.createdAt)}
								</span>
							</div>
							<p className="text-gray-700 mb-2">{comment.text}</p>
						</div>

						{/* Reply & Like buttons */}
						<div className="mt-2 flex items-center gap-3">
							<Button
								variant="ghost"
								size="sm"
								className="text-gray-500 hover:text-gray-700 p-0 h-auto text-xs"
							>
								<ThumbsUp className="size-4 mr-1" />
								Like
							</Button>

							{level < maxLevel && (
								<Button
									variant="ghost"
									size="sm"
									className="text-gray-500 hover:text-gray-700 p-0 h-auto text-xs"
									onClick={handleReplyClick}
								>
									<Reply className="size-4 mr-1" />
									Reply
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Reply Form */}
			{showReplyForm && (
				<div className="mt-2 p-3 bg-white rounded-lg border border-gray-100 ml-8">
					<Textarea
						placeholder="Write your reply..."
						value={replyText}
						onChange={(e) => setReplyText(e.target.value)}
						className="min-h-[80px] mb-2 bg-white resize-none text-xs"
					/>
					<div className="flex gap-2 justify-end">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setShowReplyForm(false)}
							className="text-xs"
						>
							Cancel
						</Button>
						<Button
							size="sm"
							onClick={() => submitReply()}
							disabled={isSubmitting || replyText.trim() === ''}
							className="text-xs"
						>
							{isSubmitting ? 'Submitting...' : 'Reply'}
						</Button>
					</div>
				</div>
			)}

			{/* Nested Replies */}
			{comment.replies?.length > 0 && (
				<div className="nested-replies">
					{showReplies ? (
						<>
							{comment.replies.map((reply) => (
								<CommentItem
									key={reply.id}
									comment={reply}
									level={level + 1}
									onReply={onReply}
									parentId={comment.id}
									maxLevel={maxLevel}
								/>
							))}
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setShowReplies(false)}
								className="text-xs text-gray-500 ml-8 mt-1"
							>
								Hide replies
							</Button>
						</>
					) : (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setShowReplies(true)}
							className="text-xs text-gray-500 ml-8 mt-1"
						>
							Show {comment.replies.length}{' '}
							{comment.replies.length === 1 ? 'reply' : 'replies'}
						</Button>
					)}
				</div>
			)}
		</div>
	);
};

export default CommentItem;
