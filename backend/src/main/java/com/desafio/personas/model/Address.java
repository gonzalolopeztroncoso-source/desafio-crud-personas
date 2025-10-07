package com.desafio.personas.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@Access(AccessType.FIELD)
@Schema(description = "Dirección asociada a una persona")
public class Address {

    @Schema(example = "Calle Prueba")
    private String calle;

    @Schema(example = "Comuna")
    private String comuna;

    @Schema(example = "Region Metropolitana")
    private String region;
}
