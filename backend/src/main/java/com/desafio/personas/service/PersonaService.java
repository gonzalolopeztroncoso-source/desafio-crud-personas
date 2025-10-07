package com.desafio.personas.service;

import com.desafio.personas.exception.PersonaNotFoundException;
import com.desafio.personas.model.Persona;
import com.desafio.personas.repository.PersonaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonaService {
    private final PersonaRepository repo;

    public List<Persona> listar() {
        return repo.findAll();
    }

    public Persona guardar(Persona p) {
        if (repo.existsByRut(p.getRut())) {
            throw new IllegalArgumentException("El RUT ya está registrado");
        }
        return repo.save(p);
    }

    public Persona buscar(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new PersonaNotFoundException("Persona con id " + id + " no encontrada"));
    }

    public void eliminar(Long id) {
        if(!repo.existsById(id)){
            throw new PersonaNotFoundException("Persona con id " + id + " no existe");
        }
        repo.deleteById(id);
    }
    public Persona actualizar(Long id, Persona personaActualizada) {
        Persona persona = repo.findById(id)
                .orElseThrow(() -> new PersonaNotFoundException("Persona con id " + id + " no existe"));

        persona.setRut(personaActualizada.getRut());
        persona.setNombre(personaActualizada.getNombre());
        persona.setApellido(personaActualizada.getApellido());
        persona.setFechaNacimiento(personaActualizada.getFechaNacimiento());
        persona.setDireccion(personaActualizada.getDireccion());

        return repo.save(persona);
    }
}
