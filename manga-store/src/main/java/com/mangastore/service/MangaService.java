package com.mangastore.service;

import com.mangastore.exception.ResourceNotFoundException;
import com.mangastore.model.Manga;
import com.mangastore.repository.MangaRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;


@Service
public class MangaService {

    private final MangaRepository mangaRepository;

    public MangaService(MangaRepository mangaRepository) {
        this.mangaRepository = mangaRepository;
    }

    public List<Manga> searchMangasByTitle(String title) {
    return mangaRepository.findByTitleContainingIgnoreCase(title);
    }

    public Page<Manga> getAllMangas(Pageable pageable) {
        return mangaRepository.findAll(pageable);
    }

    public Manga getMangaById(Long id) {
        return mangaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Manga not found with id " + id));
    }

    public Manga saveManga(Manga manga) {
        return mangaRepository.save(manga);
    }

    public Manga updateManga(Long id, Manga mangaDetails) {

    Manga manga = mangaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Manga no encontrado"));

    manga.setTitle(mangaDetails.getTitle());
    manga.setAuthor(mangaDetails.getAuthor());
    manga.setPrice(mangaDetails.getPrice());
    manga.setStock(mangaDetails.getStock());
    manga.setDescription(mangaDetails.getDescription());

    return mangaRepository.save(manga);
}

    public void deleteManga(Long id) {
        mangaRepository.deleteById(id);
    }
}