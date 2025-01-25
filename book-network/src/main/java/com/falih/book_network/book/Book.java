package com.falih.book_network.book;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Book {

    @Id
    private Integer id;

    private String title;

    private String authorName;

    private String isbn;

    private String synopsis;

    private String bookCover;

    private boolean archived;

    private boolean shareable;

}
