package com.desafio.personas.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI apiInfo() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Personas")
                        .description("CRUD de Personas - Desafío Técnico 2025")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Gonzalo López")
                                .email("gonza@example.com")));
    }
}
