using bl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bl.BlApi
{
    public interface IClient : ICrud<Client>
    {
        DateTime GetNextDentalCare();
    }
}
