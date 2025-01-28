package com.falih.book_network.history;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookTransactionHistoryRepository extends JpaRepository<BookTransactionHistory, Integer> {

        @Query("""
                        SELECT history FROM BookTransactionHistory history WHERE history.user.id = :userId
                        """)
        Page<BookTransactionHistory> findAllBorrowedBooks(Pageable pageable, String userId);

        @Query("""
                        SELECT history FROM BookTransactionHistory history WHERE history.book.owner.id = :userId
                                """)
        Page<BookTransactionHistory> findAllReturnedBooks(Pageable pageable, String userId);

        @Query("""
                        SELECT
                        (COUNT (*) > 0) AS isBorrowed
                        FROM BookTransactionHistory bookTransactionHistory
                        WHERE bookTransactionHistory.user.id = :userId
                        AND bookTransactionHistory.book.id = :bookId
                        AND bookTransactionHistory.returnApproved = false
                                """)
        boolean isAlreadyBorrowedByUser(@Param("bookId") Integer bookId, @Param("userId") String userId);

        @Query("""
                        SELECT transaction FROM BookTransactionHistory transaction
                        WHERE transaction.book.id = :bookId
                        AND transaction.user.id = :userId
                        AND transaction.returned = false
                        AND transaction.returnApproved = false
                        """)
        Optional<BookTransactionHistory> findByBookIdAndUserId(@Param("bookId") Integer bookId,
                        @Param("userId") Integer userId);

        @Query("""
                        SELECT transaction FROM BookTransactionHistory transaction
                        WHERE transaction.book.id = :bookId
                        AND transaction.book.owner.id = :userId
                        AND transaction.returned = true
                        AND transaction.returnApproved = false
                        """)
        Optional<BookTransactionHistory> findByBookIdAndOwnerId(@Param("bookId") Integer bookId,
                        @Param("userId") Integer userId);
}
