package com.desafio.personas.service;

import com.desafio.personas.exception.PersonaNotFoundException;
import com.desafio.personas.model.Persona;
import com.desafio.personas.model.Address;
import com.desafio.personas.repository.PersonaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PersonaServiceTest {

    @Mock
    private PersonaRepository repository;

    @InjectMocks
    private PersonaService service;

    private Persona persona;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        persona = new Persona(1L, "12.345.678-9", "Gonzalo", "López",
                LocalDate.of(1990, 8, 20),
                new Address("Berta Correa 1994", "Huechuraba", "Metropolitana"));
    }

    @Test
    void testGuardarPersona() {
        when(repository.save(any(Persona.class))).thenReturn(persona);
        Persona result = service.guardar(persona);
        assertEquals("Gonzalo", result.getNombre());
        verify(repository, times(1)).save(persona);
    }

    @Test
    void testListarPersonas() {
        when(repository.findAll()).thenReturn(List.of(persona));
        List<Persona> personas = service.listar();
        assertEquals(1, personas.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void testBuscarPersonaPorId() {
        when(repository.findById(1L)).thenReturn(Optional.of(persona));
        Persona result = service.buscar(1L);
        assertEquals("López", result.getApellido());
    }

    @Test
    void testEliminarPersonaExistente() {
        when(repository.existsById(1L)).thenReturn(true);
        doNothing().when(repository).deleteById(1L);

        service.eliminar(1L);

        verify(repository, times(1)).deleteById(1L);
    }

    @Test
    void testEliminarPersonaInexistente() {
        when(repository.existsById(99L)).thenReturn(false);

        Exception exception = assertThrows(
                PersonaNotFoundException.class,
                () -> service.eliminar(99L)
        );

        assertEquals("Persona con id 99 no existe", exception.getMessage());
        verify(repository, never()).deleteById(anyLong());
    }
}
