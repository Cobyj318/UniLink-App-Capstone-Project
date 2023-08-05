import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';

const CommentSection = () => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardOffset(e.endCoordinates.height);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleReplyInputChange = (commentId, text) => {
    setReplyInputs({
      ...replyInputs,
      [commentId]: text,
    });
  };

  const handleSubmitComment = () => {
    if (comment.trim() !== '') {
      const newComment = {
        id: commentsList.length + 1,
        author: 'User', // You can set the actual user's name here
        content: comment.trim(),
        timestamp: new Date().toLocaleString(),
        replies: [], // Add an empty array for storing replies
      };
      setCommentsList([...commentsList, newComment]);
      setComment('');
    }
  };

  const handleReply = (commentId) => {
    const replyText = replyInputs[commentId];
    if (replyText && replyText.trim() !== '') {
      const updatedComments = commentsList.map((item) => {
        if (item.id === commentId) {
          return {
            ...item,
            replies: [
              ...item.replies,
              {
                id: item.replies.length + 1,
                author: 'User', // You can set the actual user's name here
                content: replyText.trim(),
                timestamp: new Date().toLocaleString(),
              },
            ],
          };
        }
        return item;
      });
      setCommentsList(updatedComments);
      setReplyInputs({
        ...replyInputs,
        [commentId]: '', // Clear the reply input field after submitting the reply
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Comments</Text>
        {commentsList.map((item) => (
          <View key={item.id} style={styles.commentContainer}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            {/* Display replies */}
            {item.replies.map((reply) => (
              <View key={reply.id} style={styles.replyContainer}>
                <Text style={styles.replyAuthor}>{reply.author}</Text>
                <Text style={styles.replyContent}>{reply.content}</Text>
                <Text style={styles.replyTimestamp}>{reply.timestamp}</Text>
              </View>
            ))}
            <View style={styles.replyInputContainer}>
              <TextInput
                style={styles.replyInput}
                placeholder="Write your reply..."
                value={replyInputs[item.id] || ''}
                onChangeText={(text) => handleReplyInputChange(item.id, text)}
              />
              <TouchableOpacity style={styles.replyButton} onPress={() => handleReply(item.id)}>
                <Text style={styles.replyButtonText}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Write your comment..."
          value={comment}
          onChangeText={handleCommentChange}
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleSubmitComment}>
          <Text style={styles.commentButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      {keyboardOffset > 0 && <View style={{ height: keyboardOffset }} />}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingBottom: 5,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    marginBottom: 5,
  },
  timestamp: {
    color: 'gray',
    fontSize: 12,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#3498db',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  commentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  replyContainer: {
    marginLeft: 30, // Indent replies to differentiate from comments
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingBottom: 5,
  },
  replyAuthor: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  replyContent: {
    fontSize: 14,
    marginBottom: 5,
  },
  replyTimestamp: {
    color: 'gray',
    fontSize: 10,
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  replyInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
  replyButton: {
    backgroundColor: '#3498db',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  replyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CommentSection;
