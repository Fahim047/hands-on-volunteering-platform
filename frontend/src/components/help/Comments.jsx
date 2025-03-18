import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks';
import { getCommentsByHelpRequestId, postComment } from '@/lib/queries';
import CommentItem from './CommentItem';

// Main Comments Component
const Comments = ({ helpRequestId }) => {
	const { user } = useAuth();
	const [commentText, setCommentText] = useState('');
	const queryClient = useQueryClient();

	// Fetch comments
	const {
		data: comments = [],
		isPending,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['help-request', helpRequestId, 'comments'],
		queryFn: () => getCommentsByHelpRequestId(helpRequestId),
	});

	// Mutate function for submitting comments
	const { mutate: submitComment, isPending: isSubmitting } = useMutation({
		mutationFn: () =>
			postComment(helpRequestId, { text: commentText, author: user._id }),
		onSuccess: () => {
			toast.success('Comment submitted successfully!');
			setCommentText('');
			queryClient.invalidateQueries([
				'help-request',
				helpRequestId,
				'comments',
			]); // Refresh comments
		},
		onError: () => {
			toast.error('Could not submit comment. Please try again!');
		},
	});

	// Handle form submission
	const handleSubmitComment = () => {
		if (commentText.trim() === '') return;
		submitComment();
	};

	// Handle loading & error states
	if (isPending)
		return <div className="py-4 text-center">Loading comments...</div>;
	if (isError)
		return (
			<div className="py-4 text-center text-red-500">
				Failed to load comments
			</div>
		);

	return (
		<div className="comments-section space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="font-medium text-lg">Comments ({comments.length})</h2>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => refetch()}
					className="text-xs"
				>
					Refresh
				</Button>
			</div>

			{/* New comment form */}
			<div className="new-comment-form p-4 bg-gray-50 rounded-lg">
				<div className="flex items-start gap-3">
					<Avatar className="size-8">
						<AvatarImage src={user?.avatar} alt="" />
						<AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<Textarea
							placeholder="Write a comment..."
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
							className="min-h-[100px] mb-3 resize-none"
						/>
						<div className="flex justify-end">
							<Button
								onClick={handleSubmitComment}
								disabled={isSubmitting || commentText.trim() === ''}
							>
								{isSubmitting ? 'Submitting...' : 'Comment'}
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Comments list */}
			{comments.length > 0 ? (
				<div className="comments-list space-y-1">
					{comments.map((comment) => (
						<CommentItem key={comment.id} comment={comment} level={0} />
					))}
				</div>
			) : (
				<div className="text-center py-6 text-gray-500">
					No comments yet. Be the first to comment!
				</div>
			)}
		</div>
	);
};

export default Comments;
