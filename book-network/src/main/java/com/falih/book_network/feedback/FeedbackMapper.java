package com.falih.book_network.feedback;

import java.util.Objects;

import org.springframework.stereotype.Service;

import com.falih.book_network.book.Book;

@Service
public class FeedbackMapper {

    public Feedback toFeedback(FeedbackRequest feedbackRequest) {
        return Feedback.builder()
                .note(feedbackRequest.note())
                .comment(feedbackRequest.comment())
                .book(Book.builder()
                        .id(feedbackRequest.bookId())
                        .build())
                .build();
    }

    public FeedbackResponse toFeedbackResponse(Feedback feedback, String userId) {
        return FeedbackResponse.builder()
            .note(feedback.getNote())
            .comment(feedback.getComment())
            .ownFeedback(Objects.equals(feedback.getCreatedBy(), userId))
            .build();
        }
}