package com.example.practice;

import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@SpringBootTest
class PracticeApplicationTest {


    PracticeApplicationTest() {
    }

    @Test
    void contextLoads() {
    }

    @Test
    void sendingRestRequest() {
        String userName = "Artem";
        String userPhone = "+380960267186";
        registerUser("Artem", "+380960267186");
    }

    private static void registerUser(String name, String phone) {
        String url = "http://localhost:8080/user/registration";
        Map<String, Object> jsonData = new HashMap<>();
        jsonData.put("name", name);
        jsonData.put("phone", phone);
        makePostRequestWithJSONData("http://localhost:8080/user/registration", jsonData);
    }

    private static void makePostRequestWithJSONData(String url, Map<String, Object> jsonData) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> request = new HttpEntity<>(jsonData, headers);

        try {
            restTemplate.postForObject(url, request, String.class);
            System.out.println("Was sent to the server");
        } catch (HttpClientErrorException var6) {
            System.out.println("Error");
            System.out.println(var6.getMessage());
        }

    }
}
