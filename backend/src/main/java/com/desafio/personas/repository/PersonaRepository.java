package com.desafio.personas.repository;

import com.desafio.personas.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
    boolean existsByRut(String rut);
}
