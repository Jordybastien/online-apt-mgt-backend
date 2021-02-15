import Response from '../utils/responseHandler';
import ApartmentService from '../services/apartmentService';

const {
  addApartment,
  findApartmentByNameAndAddress,
  getAllAPartments,
} = ApartmentService;

const response = new Response();

class ApartmentController {
  static async recordApartment(req, res) {
    try {
      const { name, address } = req.body;
      const findApartment = await findApartmentByNameAndAddress(name, address);
      if (findApartment) {
        response.setError(
          401,
          'Apartment with that name and address already exists'
        );
        return response.send(res);
      }
      await addApartment({ name, address });
      response.setSuccess(201, 'Apartment added successfully');
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message || 'Something went wrong');
      return response.send(res);
    }
  }

  static async fetchAllApartments(req, res) {
    try {
      const apartments = await getAllAPartments();
      response.setSuccess(200, 'All apartments', apartments);
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message || 'Something went wrong');
      return response.send(res);
    }
  }
}

export default ApartmentController;
