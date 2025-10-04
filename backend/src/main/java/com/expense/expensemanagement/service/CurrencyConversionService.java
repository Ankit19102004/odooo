package com.expense.expensemanagement.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class CurrencyConversionService {

    @Value("${currency.api.key:}")
    private String apiKey;

    @Value("${currency.api.base-url:https://api.exchangerate-api.com/v4/latest}")
    private String baseUrl;

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public CurrencyConversionService() {
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        this.objectMapper = new ObjectMapper();
    }

    public BigDecimal convertCurrency(BigDecimal amount, String fromCurrency, String toCurrency) {
        if (fromCurrency.equals(toCurrency)) {
            return amount;
        }

        try {
            BigDecimal exchangeRate = getExchangeRate(fromCurrency, toCurrency);
            return amount.multiply(exchangeRate).setScale(2, RoundingMode.HALF_UP);
        } catch (Exception e) {
            // Fallback to 1:1 conversion if API fails
            return amount;
        }
    }

    public BigDecimal getExchangeRate(String fromCurrency, String toCurrency) {
        if (fromCurrency.equals(toCurrency)) {
            return BigDecimal.ONE;
        }

        try {
            String url = baseUrl + "/" + fromCurrency.toUpperCase();
            if (!apiKey.isEmpty()) {
                url += "?access_key=" + apiKey;
            }

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(10))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode jsonNode = objectMapper.readTree(response.body());
                JsonNode rates = jsonNode.get("rates");
                
                if (rates != null && rates.has(toCurrency.toUpperCase())) {
                    return rates.get(toCurrency.toUpperCase()).decimalValue();
                }
            }
        } catch (IOException | InterruptedException e) {
            // Log error and fallback to 1:1 conversion
        }

        // Fallback to 1:1 conversion
        return BigDecimal.ONE;
    }

    public boolean isCurrencySupported(String currency) {
        // Common currency codes
        String[] supportedCurrencies = {
            "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", 
            "SGD", "HKD", "NZD", "SEK", "NOK", "DKK", "PLN", "CZK", "HUF",
            "ZAR", "BRL", "MXN", "KRW", "THB", "MYR", "PHP", "IDR", "VND"
        };

        for (String supported : supportedCurrencies) {
            if (supported.equalsIgnoreCase(currency)) {
                return true;
            }
        }
        return false;
    }
}
