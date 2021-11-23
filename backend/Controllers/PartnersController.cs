using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CapitanAmericaBackend.models;

namespace CapitanAmericaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PartnersController : ControllerBase
    {
        private readonly CaptainAmericaContext _context;
        
        public PartnersController(CaptainAmericaContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Partners.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            if (id >= 0)
                return BadRequest("id can not be null");
            
            return Ok(await _context.Partners.FirstOrDefaultAsync(x => x.Id == id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(Partner data)
        {
            if (data is null)
                return BadRequest("Partner data can not be null");
            
            await _context.Partners.AddAsync(data);
            await _context.SaveChangesAsync();

            return Created( $"api/partners/{data.Id}", data);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Partner data)
        {
            if (data is null)
                return BadRequest("partner data can not be null");

            if (!await _context.Partners.AnyAsync(x => x.Id == data.Id))
                return BadRequest("partner not found");

            var partner = await _context.Partners.FirstOrDefaultAsync(x => x.Id == data.Id);

            partner.Name = data.Name;
            partner.Home = data.Home;
            partner.Nationality = data.Nationality;
            partner.ProvidedResources = data.ProvidedResources;
            partner.UpdatedAt = DateTime.Now;

            _context.Partners.Update(partner);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
                return BadRequest("id can not be null");

            if (!await _context.Partners.AnyAsync(x => x.Id == id))
                return BadRequest("partner not found");

            _context.Partners.Remove(
                await _context.Partners.FirstOrDefaultAsync(x => x.Id == id));
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}