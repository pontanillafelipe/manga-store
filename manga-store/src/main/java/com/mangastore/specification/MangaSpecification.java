package com.mangastore.specification;

import com.mangastore.model.Manga;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class MangaSpecification {

    public static Specification<Manga> hasGenres(List<String> genres) {
        return (root, query, criteriaBuilder)
                -> root.get("genre").in(genres);
    }

    public static Specification<Manga> hasEditorials(List<String> editorials) {
        return (root, query, criteriaBuilder)
                -> root.get("editorial").in(editorials);
    }

    public static Specification<Manga> hasPresale(Boolean presale) {
        return (root, query, criteriaBuilder)
                -> criteriaBuilder.equal(root.get("presale"), presale);
    }

    public static Specification<Manga> hasOnSale(Boolean onSale) {
        return (root, query, criteriaBuilder)
                -> criteriaBuilder.equal(root.get("onSale"), onSale);
    }

}
