package com.imprenta.backend.controlador;

import com.imprenta.backend.modelo.Producto;
import com.imprenta.backend.repositorio.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    @PostMapping
    public Producto guardarProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @GetMapping("/stock-bajo")
    public List<Producto> obtenerConStockBajo() {
        return productoRepository.findByStockLessThanEqual(5); // <= 5
    }
}
