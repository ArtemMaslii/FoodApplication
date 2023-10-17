package com.example.practice.controllers;

import com.example.practice.DTOs.MenuCardDTO;
import com.example.practice.models.MenuCard;
import com.example.practice.services.MenuCardsService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/menu")
public class MenuCardController {

    private final MenuCardsService menuCardsService;

    private final ModelMapper mapper;

    public MenuCardController(MenuCardsService menuCardsService, ModelMapper mapper) {
        this.menuCardsService = menuCardsService;
        this.mapper = mapper;
    }

    @GetMapping
    public Map.Entry<String, List<MenuCardDTO>> getMenuCards() {
        return Map.entry("menu", menuCardsService.getMenu().stream()
                .map(this::convertToMenuCardsDTO)
                .collect(Collectors.toList()));
    }

    private MenuCardDTO convertToMenuCardsDTO(MenuCard menuCard) {
        return mapper.map(menuCard, MenuCardDTO.class);
    }
}
