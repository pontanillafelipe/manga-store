package com.mangastore.dto;

public class MangaResponseDTO {

    private Long id;
    private String title;
    private String author;
    private String genre;
    private String editorial;
    private Double price;
    private Integer stock;

    public MangaResponseDTO(Long id, String title, String author, String genre, String editorial, Double price, Integer stock) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.editorial = editorial;
        this.price = price;
        this.stock = stock;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getGenre() {
        return genre;
    }

    public String getEditorial() {
        return editorial;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getStock() {
        return stock;
    }
}