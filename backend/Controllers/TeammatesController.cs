using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CapitanAmericaBackend.models;

namespace CapitanAmericaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeammatesController : ControllerBase
    {
        private readonly CaptainAmericaContext _context;
        
        public TeammatesController(CaptainAmericaContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Teammates.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            if (id >= 0)
                return BadRequest("id can not be null");
            
            return Ok(await _context.Teammates.FirstOrDefaultAsync(x => x.Id == id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(Teammate data)
        {
            if (data is null)
                return BadRequest("Teammate data can not be null");
            
            await _context.Teammates.AddAsync(data);
            await _context.SaveChangesAsync();

            return Created( $"api/teammates/{data.Id}", data);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Teammate data)
        {
            if (data is null)
                return BadRequest("Teammate data can not be null");

            if (!await _context.Teammates.AnyAsync(x => x.Id == data.Id))
                return BadRequest("Teammate not found");

            var teammate = await _context.Teammates.FirstOrDefaultAsync(x => x.Id == data.Id);

            teammate.Name = data.Name;
            teammate.Home = data.Home;
            teammate.Nationality = data.Nationality;
            teammate.Team = data.Team;
            teammate.UpdatedAt = DateTime.Now;

            _context.Teammates.Update(teammate);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
                return BadRequest("id can not be null");

            if (!await _context.Teammates.AnyAsync(x => x.Id == id))
                return BadRequest("Teammate not found");

            _context.Teammates.Remove(
                await _context.Teammates.FirstOrDefaultAsync(x => x.Id == id));
            await _context.SaveChangesAsync();

            return Ok();
        }
        
    }
}