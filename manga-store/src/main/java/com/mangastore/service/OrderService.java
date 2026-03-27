package com.mangastore.service;

import com.mangastore.dto.CreateOrderRequestDTO;
import com.mangastore.dto.OrderItemRequestDTO;
import com.mangastore.model.Order;
import com.mangastore.model.OrderItem;
import com.mangastore.model.Manga;
import com.mangastore.repository.OrderRepository;
import com.mangastore.repository.OrderItemRepository;
import com.mangastore.repository.MangaRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MangaRepository mangaRepository;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            MangaRepository mangaRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.mangaRepository = mangaRepository;
    }

    @Transactional
    public Order createOrder(CreateOrderRequestDTO request) {

        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setOrderDate(LocalDateTime.now());

        double total = 0;

        order = orderRepository.save(order);

        for (OrderItemRequestDTO itemDTO : request.getItems()) {

            Manga manga = mangaRepository.findById(itemDTO.getMangaId())
                    .orElseThrow(() -> new RuntimeException("Manga not found"));

            if (manga.getStock() < itemDTO.getQuantity()) {
                throw new RuntimeException("Not enough stock for manga: " + manga.getTitle());
            }

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setMangaId(manga.getId());
            item.setQuantity(itemDTO.getQuantity());
            item.setPrice(manga.getPrice());

            orderItemRepository.save(item);

            total += manga.getPrice() * itemDTO.getQuantity();

            // Actualizar Stock
            manga.setStock(manga.getStock() - itemDTO.getQuantity());
            mangaRepository.save(manga);
        }

        order.setTotal(total);

        return orderRepository.save(order);
    }

    public List<Order> getOrders() {
    return orderRepository.findAll();
    }
   
}