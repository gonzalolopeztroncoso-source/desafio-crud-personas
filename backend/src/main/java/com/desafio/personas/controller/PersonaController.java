package com.desafio.personas.controller;

import com.desafio.personas.model.Persona;
import com.desafio.personas.service.PersonaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/personas")
@CrossOrigin(origins = "http://localhost:5173")
public class PersonaController {
    private final PersonaService service;

    public PersonaController(PersonaService service) {
        this.service = service;
    }
    @GetMapping
    public List<Persona> listar() {
        return service.listar();
    }
    @GetMapping("/{id}")
    public Persona buscar(@PathVariable Long id) {
        return service.buscar(id);
    }
    @PostMapping
    public ResponseEntity<Persona> guardar(@Valid @RequestBody Persona p) {
        return ResponseEntity.ok(service.guardar(p));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Persona> actualizar(@PathVariable("id") Long id, @Valid @RequestBody Persona p) {
        return ResponseEntity.ok(service.actualizar(id, p));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable("id") Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

}
