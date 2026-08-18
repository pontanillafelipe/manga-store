package com.mangastore.repository;

import com.mangastore.model.Manga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDateTime;
import java.util.List;

public interface MangaRepository extends JpaRepository<Manga, Long>,
        JpaSpecificationExecutor<Manga> {

    List<Manga> findByTitleContainingIgnoreCase(String title);

    List<Manga> findByPresaleTrue();

    Page<Manga> findByPresaleTrue(Pageable pageable);

    Page<Manga> findByCreatedAtAfter(LocalDateTime date, Pageable pageable);

    Page<Manga> findAllByOrderBySoldDesc(Pageable pageable);

    List<Manga> findTop10ByOrderByCreatedAtDesc();

    List<Manga> findTop10ByOrderBySoldDesc();

    Page<Manga> findByOnSaleTrue(Pageable pageable);
}