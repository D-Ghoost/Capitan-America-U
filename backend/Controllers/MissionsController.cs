using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CapitanAmericaBackend.models;

namespace CapitanAmericaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MissionsController : ControllerBase
    {
        private readonly CaptainAmericaContext _context;
        
        public MissionsController(CaptainAmericaContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Misions.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            if (id >= 0)
                return BadRequest("id can not be null");
            
            return Ok(await _context.Misions.FirstOrDefaultAsync(x => x.Id == id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(Mission data)
        {
            if (data is null)
                return BadRequest("mission data can not be null");

            data.Id = 0;

            await _context.Misions.AddAsync(data);
            await _context.SaveChangesAsync();

            return Created( $"api/Missions/{data.Id}", data);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Mission data)
        {
            if (data is null)
                return BadRequest("mission data can not be null");

            if (!await _context.Misions.AnyAsync(x => x.Id == data.Id))
                return BadRequest("mission not found");

            var mission = await _context.Misions.FirstOrDefaultAsync(x => x.Id == data.Id);

            mission.MissionDate = data.MissionDate;
            mission.Place = data.Place;
            mission.Description = data.Description;
            mission.UpdatedAt = DateTime.Now;

            _context.Misions.Update(mission);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
                return BadRequest("id can not be null");

            if (!await _context.Misions.AnyAsync(x => x.Id == id))
                return BadRequest("Mission not found");

            _context.Misions.Remove(
                await _context.Misions.FirstOrDefaultAsync(x => x.Id == id));
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}