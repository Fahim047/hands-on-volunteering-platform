import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Reply, UserRound } from 'lucide-react';
import { useState } from 'react';

const urgencyVariants = {
	low: 'bg-blue-100 text-blue-800',
	medium: 'bg-yellow-100 text-yellow-800',
	urgent: 'bg-red-100 text-red-800',
};

// Sample data with replies
const request = {
	id: 1,
	title: 'Help with React Query',
	description: 'I need help understanding how React Query works.',
	urgency: 'medium',
	author: { name: 'Anonymous' },
	comments: [
		{
			id: 1,
			author: { name: 'User1', avatar: '' },
			text: 'Have you tried the documentation?',
			replies: [],
		},
		{
			id: 2,
			author: { name: 'User2', avatar: '' },
			text: 'React Query is great for data fetching.',
			replies: [
				{
					id: 3,
					author: { name: 'User3', avatar: '' },
					text: 'I agree, especially for managing server state.',
				},
			],
		},
	],
};

const HelpRequestDetailsPage = () => {
	const [commentText, setCommentText] = useState('');
	const [replyTexts, setReplyTexts] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [replyingTo, setReplyingTo] = useState(null);

	const handleSubmitComment = async () => {
		if (commentText.trim() === '') return;

		setIsSubmitting(true);
		await new Promise((resolve) => setTimeout(resolve, 500));

		console.log('Comment submitted:', commentText);
		setIsSubmitting(false);
		setCommentText('');
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

	return (
		<div className="max-w-3xl mx-auto p-4">
			{/* Request Details */}
			<Card className="mb-6">
				<CardHeader className="pb-4">
					<div className="flex justify-between items-center">
						<CardTitle>{request.title}</CardTitle>
						<Badge className={`${urgencyVariants[request.urgency]}`}>
							{request.urgency}
						</Badge>
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
						<UserRound className="size-4" />
						<span>{request.author.name}</span>
					</div>
				</CardHeader>
				<div className="px-6 pb-4">
					<p className="text-gray-700">{request.description}</p>
				</div>
			</Card>

			{/* Comments Section */}
			<div className="mb-6">
				<h2 className="font-medium text-lg mb-4">
					Comments (
					{request.comments.reduce(
						(count, comment) => count + 1 + comment.replies.length,
						0
					)}
					)
				</h2>

				{request.comments.length > 0 ? (
					<div className="space-y-4">
						{request.comments.map((comment) => (
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
														<p className="text-gray-600 text-sm">
															{reply.text}
														</p>
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
			</div>

			<Separator className="my-6" />

			{/* Main Comment Form */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Add Comment</CardTitle>
				</CardHeader>
				<div className="p-4">
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
			</Card>
		</div>
	);
};

export default HelpRequestDetailsPage;
