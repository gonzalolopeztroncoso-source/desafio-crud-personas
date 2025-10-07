package com.desafio.personas.repository;

import com.desafio.personas.model.Persona;
import com.desafio.personas.model.Address;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class PersonaRepositoryTest {

    @Autowired
    private PersonaRepository repository;

    @Test
    void testGuardarYBuscarPersona() {
        Persona p = new Persona(null, "22.333.444-5", "Andrea", "Sánchez",
                LocalDate.of(1995, 5, 15),
                new Address("Los Alamos 123", "Ñuñoa", "Metropolitana"));

        repository.save(p);

        List<Persona> personas = repository.findAll();
        assertThat(personas).hasSize(1);
        assertThat(personas.get(0).getNombre()).isEqualTo("Andrea");
    }
}
