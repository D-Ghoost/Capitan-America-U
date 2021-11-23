using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CapitanAmericaBackend.models;

namespace CapitanAmericaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SavedPeopleController : ControllerBase
    {
        private readonly CaptainAmericaContext _context;
        
        public SavedPeopleController(CaptainAmericaContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.SavedPeople.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            if (id >= 0)
                return BadRequest("id can not be null");
            
            return Ok(await _context.SavedPeople.FirstOrDefaultAsync(x => x.Id == id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(SavedPeople data)
        {
            if (data is null)
                return BadRequest("Saved People data can not be null");
            
            await _context.SavedPeople.AddAsync(data);
            await _context.SaveChangesAsync();

            return Created( $"api/savedpeople/{data.Id}", data);
        }

        [HttpPut]
        public async Task<IActionResult> Update(SavedPeople data)
        {
            if (data is null)
                return BadRequest("Saved People data can not be null");

            if (!await _context.SavedPeople.AnyAsync(x => x.Id == data.Id))
                return BadRequest("Save People not found");

            var savedPeople = await _context.SavedPeople.FirstOrDefaultAsync(x => x.Id == data.Id);

            savedPeople.Name = data.Name;
            savedPeople.Home = data.Home;
            savedPeople.Nationality = data.Nationality;
            savedPeople.UpdatedAt = DateTime.Now;
            savedPeople.SavedDate = data.SavedDate;
            savedPeople.SavedPlace = data.SavedPlace;

            _context.SavedPeople.Update(savedPeople);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
                return BadRequest("id can not be null");

            if (!await _context.SavedPeople.AnyAsync(x => x.Id == id))
                return BadRequest("Saved People not found");

            _context.SavedPeople.Remove(
                await _context.SavedPeople.FirstOrDefaultAsync(x => x.Id == id));
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}