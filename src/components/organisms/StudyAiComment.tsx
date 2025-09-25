import React, { useEffect } from 'react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { useAppStore } from '../../store/useAppStore';
import { generateAiComment } from '../../services/geminiService';
import { ulid } from 'ulid';

export const StudyAiCommen: React.FC = () => {
  const { comments, sessions, addMultipleComments, getStatsExcludingLast } = useAppStore();
  useEffect(() => {
    let ignore = false;

    const generateMissingComments = async () => {
        const commentExistSessionIds = comments.map(comment => comment.studySessionId);
        const sessionsWithoutComment = sessions.filter(
            (session) => !commentExistSessionIds.includes(session.id)
        );
        const commentPromises = sessionsWithoutComment.map(async (session) => {
            const commentText = await generateAiComment(getStatsExcludingLast(), session);
            return {
                id: ulid(),
                studySessionId: session.id,
                comment: commentText,
            };
        });
        
        const newComments = await Promise.all(commentPromises);
        if (!ignore) {
            addMultipleComments(newComments);
        }
    }

    generateMissingComments();
    
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Card>
      <Text variant="h4" color="white" weight="semibold" className="mb-4">
        AIコメント
      </Text>
      <div className="space-y-2">
        {comments
        .sort((a, b) => b.id.localeCompare(a.id))
        .map((comment) => (
            <Text key={comment.id} variant="body" color="slate">
                {comment.comment}
            </Text>
        ))}
      </div>
    </Card>
  );
};