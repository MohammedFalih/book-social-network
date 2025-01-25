package com.falih.book_network.book;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.falih.book_network.user.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepo;

    private final BookMapper bookMapper;

    public Integer save(BookRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Book book = bookMapper.toBook(request);
        book.setOwner(user);
        return bookRepo.save(book).getId();
    }

}
