package com.mangastore.controller;

import com.mangastore.model.Manga;
import com.mangastore.service.MangaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/mangas")
@CrossOrigin(origins = "http://localhost:5173")

public class MangaController {

    private final MangaService mangaService;

    public MangaController(MangaService mangaService) {
        this.mangaService = mangaService;
    }

    @GetMapping("/search")
    public List<Manga> searchMangas(@RequestParam String title) {
        return mangaService.searchMangasByTitle(title);
    }

    @GetMapping("/presale")
    public List<Manga> getPresaleMangas() {
        System.out.println(">>> Entró a /presale");
        return mangaService.getPresaleMangas();
    }

    @GetMapping("/new")
    public List<Manga> getNewMangas() {
        System.out.println(">>> Entró a /new");
        return mangaService.getNewMangas();
    }

    @GetMapping("/bestsellers")
    public List<Manga> getBestSellerMangas() {
        System.out.println(">>> Entró a /bestsellers");
        return mangaService.getBestSellerMangas();
    }

    @GetMapping
    public Page<Manga> getAllMangas(
            @RequestParam(required = false) List<String> genres,
            @RequestParam(required = false) List<String> editorials,
            @RequestParam(required = false) Boolean presale,
            @RequestParam(required = false) Boolean onSale,
            Pageable pageable
    ) {

        System.out.println("GENRES: " + genres);
        System.out.println("EDITORIALS: " + editorials);
        System.out.println("PRESALE: " + presale);
        System.out.println("ON SALE: " + onSale);

        return mangaService.getFilteredMangas(
                genres,
                editorials,
                presale,
                onSale,
                pageable
        );
    }

    @GetMapping("/{id}")
    public Manga getMangaById(@PathVariable Long id) {
        return mangaService.getMangaById(id);
    }

    @PostMapping(consumes = "multipart/form-data")
    public Manga createManga(
            @RequestParam String title,
            @RequestParam String author,
            @RequestParam Double price,
            @RequestParam Integer stock,
            @RequestParam String description,
            @RequestParam("image") MultipartFile image,
            @RequestParam String genre,
            @RequestParam String editorial,
            @RequestParam Boolean presale,
            @RequestParam(required = false) Boolean onSale,
            @RequestParam(required = false) Double originalPrice,
            @RequestParam(required = false) LocalDate releaseDate
    ) throws IOException {

        String uploadDir = "uploads/mangas/";

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();

        Path filePath = Paths.get(uploadDir + fileName);

        Files.createDirectories(filePath.getParent());

        Files.write(filePath, image.getBytes());

        Manga manga = new Manga();

        manga.setTitle(title);
        manga.setAuthor(author);
        manga.setPrice(price);
        manga.setStock(stock);
        manga.setDescription(description);
        manga.setImageUrl("/uploads/mangas/" + fileName);
        manga.setGenre(genre);
        manga.setEditorial(editorial);
        manga.setPresale(presale);
        manga.setOnSale(onSale != null ? onSale : false);
        manga.setOriginalPrice(originalPrice != null ? originalPrice : price);
        manga.setReleaseDate(releaseDate);

        return mangaService.saveManga(manga);
    }

    @PutMapping(value = "/{id}")
    public Manga updateManga(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam String author,
            @RequestParam Double price,
            @RequestParam Integer stock,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile image,
            @RequestParam String genre,
            @RequestParam String editorial,
            @RequestParam(name = "presale") String presale,
            @RequestParam(name = "onSale", required = false) String onSale,
            @RequestParam(name = "originalPrice", required = false) String originalPrice,
            @RequestParam(name = "releaseDate", required = false) String releaseDate
    ) throws IOException {

        Manga manga = mangaService.getMangaById(id);

        manga.setTitle(title);
        manga.setAuthor(author);
        manga.setPrice(price);
        manga.setStock(stock);
        manga.setDescription(description);
        manga.setGenre(genre);
        manga.setEditorial(editorial);

        // Preventa
        manga.setPresale(Boolean.parseBoolean(presale));

        // Oferta
        boolean sale = onSale != null && Boolean.parseBoolean(onSale);
        manga.setOnSale(sale);

        if (sale && originalPrice != null && !originalPrice.isBlank()) {
            manga.setOriginalPrice(Double.parseDouble(originalPrice));
        } else {
            manga.setOriginalPrice(null);
        }

        // Fecha de lanzamiento
        if (releaseDate != null
                && !releaseDate.equals("null")
                && !releaseDate.isBlank()) {

            manga.setReleaseDate(LocalDate.parse(releaseDate));

        } else {
            manga.setReleaseDate(null);
        }

        // Nueva imagen
        if (image != null && !image.isEmpty()) {

            String uploadDir = "uploads/mangas/";

            String fileName
                    = System.currentTimeMillis() + "_" + image.getOriginalFilename();

            Path filePath = Paths.get(uploadDir + fileName);

            Files.createDirectories(filePath.getParent());

            Files.write(filePath, image.getBytes());

            manga.setImageUrl("/uploads/mangas/" + fileName);
        }

        return mangaService.saveManga(manga);
    }

    @DeleteMapping("/{id}")
    public void deleteManga(@PathVariable Long id) {
        mangaService.deleteManga(id);
    }
}
