package com.mangastore.service;

import com.mangastore.exception.ResourceNotFoundException;
import com.mangastore.model.Manga;
import com.mangastore.repository.MangaRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.mangastore.specification.MangaSpecification;
import org.springframework.data.jpa.domain.Specification;
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

    public List<Manga> getPresaleMangas() {
        return mangaRepository.findByPresaleTrue();
    }

    public List<Manga> getNewMangas() {
        return mangaRepository.findTop10ByOrderByCreatedAtDesc();
    }

    public List<Manga> getBestSellerMangas() {
        return mangaRepository.findTop10ByOrderBySoldDesc();
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
        manga.setGenre(mangaDetails.getGenre());
        manga.setEditorial(mangaDetails.getEditorial());
        manga.setPrice(mangaDetails.getPrice());
        manga.setStock(mangaDetails.getStock());
        manga.setDescription(mangaDetails.getDescription());
        manga.setPresale(mangaDetails.getPresale());
        manga.setReleaseDate(mangaDetails.getReleaseDate());

        return mangaRepository.save(manga);
    }

    public void deleteManga(Long id) {
        mangaRepository.deleteById(id);
    }

    public Page<Manga> getFilteredMangas(
            List<String> genres,
            List<String> editorials,
            Boolean presale,
            Pageable pageable
    ) {

        Specification<Manga> specification = Specification.where(null);

        if (genres != null && !genres.isEmpty()) {
            specification = specification.and(
                    MangaSpecification.hasGenres(genres)
            );
        }

        if (editorials != null && !editorials.isEmpty()) {
            specification = specification.and(
                    MangaSpecification.hasEditorials(editorials)
            );
        }

        if (presale != null) {
            specification = specification.and(
                    MangaSpecification.hasPresale(presale)
            );
        }

        return mangaRepository.findAll(specification, pageable);
    }

    public Page<Manga> getFilteredMangas(
            List<String> genres,
            List<String> editorials,
            Boolean presale,
            Boolean onSale,
            Pageable pageable
    ) {

        Specification<Manga> specification = Specification.where(null);

        if (genres != null && !genres.isEmpty()) {
            specification = specification.and(
                    MangaSpecification.hasGenres(genres)
            );
        }

        if (editorials != null && !editorials.isEmpty()) {
            specification = specification.and(
                    MangaSpecification.hasEditorials(editorials)
            );
        }

        if (presale != null) {
            specification = specification.and(
                    MangaSpecification.hasPresale(presale)
            );
        }

        if (onSale != null) {
            specification = specification.and(
                    MangaSpecification.hasOnSale(onSale)
            );
        }

        return mangaRepository.findAll(specification, pageable);
    }
}
