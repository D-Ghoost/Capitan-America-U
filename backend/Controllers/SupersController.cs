using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CapitanAmericaBackend.models;

namespace CapitanAmericaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupersController : ControllerBase
    {
        private readonly CaptainAmericaContext _context;
        
        public SupersController(CaptainAmericaContext context)
        {
            _context = context;
        }
        
        [HttpGet("enemies")]
        public async Task<IActionResult> GetAllEnemies()
        {
            return Ok(await _context.Supers.Where(s => s.IsEnemy).ToListAsync());
        }
        
        [HttpGet("allies")]
        public async Task<IActionResult> GetAllAllies()
        {
            return Ok(await _context.Supers.Where(s => s.IsAlly).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            if (id >= 0)
                return BadRequest("id can not be null");
            
            return Ok(await _context.Supers.FirstOrDefaultAsync(x => x.Id == id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(Super data)
        {
            if (data is null)
                return BadRequest("super data can not be null");
            
            await _context.Supers.AddAsync(data);
            await _context.SaveChangesAsync();

            return Created( $"api/supers/{data.Id}", data);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Super data)
        {
            if (data is null)
                return BadRequest("super data can not be null");

            if (!await _context.Supers.AnyAsync(x => x.Id == data.Id))
                return BadRequest("super not found");

            var super = await _context.Supers.FirstOrDefaultAsync(x => x.Id == data.Id);
            
            super.Name = data.Name;
            super.Home = data.Home;
            super.Nationality = data.Nationality;
            super.Description = data.Description;
            super.IsAlly = super.IsAlly;
            super.IsEnemy = super.IsEnemy;
            super.UpdatedAt = DateTime.Now;

            _context.Supers.Update(super);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
                return BadRequest("id can not be null");

            if (!await _context.Supers.AnyAsync(x => x.Id == id))
                return BadRequest("Super not found");

            _context.Supers.Remove(
                await _context.Supers.FirstOrDefaultAsync(x => x.Id == id));
            await _context.SaveChangesAsync();
            
            return Ok();
        }
    }
}