package com.example.practice.services;

import com.example.practice.models.MenuCard;
import com.example.practice.repositories.MenuCardsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional(readOnly = true)
public class MenuCardsService {

    private final MenuCardsRepository menuCardsRepository;

    public MenuCardsService(MenuCardsRepository menuCardsRepository) {
        this.menuCardsRepository = menuCardsRepository;
    }

    public List<MenuCard> getMenu() {
        return menuCardsRepository.findAll();
    }
}
