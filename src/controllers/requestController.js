import Response from '../utils/responseHandler';
import RequestService from '../services/requestService';

const {
  addRequest,
  findRequestByDescription,
  getAllRequests,
  findRequestByUserId,
  findRequestById,
  changeRequestStatus,
  alteredGetAllRequests,
  deleteRequestById,
} = RequestService;

const response = new Response();

class RequestController {
  static async recordRequest(req, res) {
    try {
      const { description } = req.body;
      const {
        id: userId,
        names: clientNames,
        Apartment: { name: apartName, address: apartAddress },
      } = req.user;

      const findRequest = await findRequestByDescription(description);
      if (findRequest) {
        response.setError(401, 'Request already sent');
        return response.send(res);
      }
      await addRequest({
        description,
        userId,
        clientNames,
        clientAddress: `${apartName},${apartAddress}`,
      });
      response.setSuccess(200, 'Request sent successfully');
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message || 'Something went wrong');
      return response.send(res);
    }
  }

  static async fetchRequests(req, res) {
    try {
      const { id: userId } = req.user;
      let requests;
      if (req.user.Role.roleValue === 0) {
        requests = await findRequestByUserId(userId);
      } else {
        requests = await getAllRequests();
      }
      response.setSuccess(200, 'Requests', requests);
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message || 'Something went wrong');
      return response.send(res);
    }
  }

  static async newFetchRequests(req, res) {
    try {
      const { id: userId } = req.user;
      let requests;
      if (req.user.Role.roleValue === 0) {
        requests = await findRequestByUserId(userId);
      } else {
        requests = await alteredGetAllRequests();
      }
      response.setSuccess(200, 'Requests', requests);
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message || 'Something went wrong');
      return response.send(res);
    }
  }

  static async alterRequest(req, res) {
    try {
      const { requestId } = req.params;
      const { status } = req.body;
      if (status !== 'processing' && status !== 'completed') {
        response.setError(401, 'Invalid status');
        return response.send(res);
      }
      const request = await findRequestById(requestId);
      if (!request) {
        response.setError(404, 'Request not found');
        return response.send(res);
      }
      if (request.status === 'completed') {
        response.setError(401, 'Request already completed');
        return response.send(res);
      }
      await changeRequestStatus(requestId, req.body);
      response.setSuccess(200, `Request status changed to ${status}`);
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message || 'Something went wrong');
      return response.send(res);
    }
  }

  static async deleteRequest(req, res) {
    try {
      const { requestId } = req.params;
      const deleted = await deleteRequestById(requestId);
      if (deleted) {
        response.setSuccess(200, 'Request deleted successfully');
      } else {
        response.setSuccess(404, 'Request not found');
      }
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message || 'Something went wrong');
      return response.send(res);
    }
  }
}

export default RequestController;
