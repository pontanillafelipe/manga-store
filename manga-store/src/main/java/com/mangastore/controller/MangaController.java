package com.mangastore.controller;

import com.mangastore.model.Manga;
import com.mangastore.service.MangaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.nio.file.*;
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

    @GetMapping
    public Page<Manga> getAllMangas(Pageable pageable) {
        return mangaService.getAllMangas(pageable);
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
            @RequestParam("image") MultipartFile image
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

        return mangaService.saveManga(manga);
    }

    @PutMapping(value="/{id}")
    public Manga updateManga(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam String author,
            @RequestParam Double price,
            @RequestParam Integer stock,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {

        Manga manga = mangaService.getMangaById(id);

        manga.setTitle(title);
        manga.setAuthor(author);
        manga.setPrice(price);
        manga.setStock(stock);
        manga.setDescription(description);

        if (image != null && !image.isEmpty()) {

            String uploadDir = "uploads/mangas/";

            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();

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