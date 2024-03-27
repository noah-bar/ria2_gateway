import { UnprocessableEntityException, NotFoundException, ApiServiceException } from '../exceptions/ApiServiceException'

export class ApiService {
  public constructor(protected apiUrl: string) {}

  protected requestInit: RequestInit = {
    headers: {
      "accept" : "application/json",
    }
  }

  protected async throwException(response: Response) {
    switch(response.status) {
      case 422:
        const errors = await response.json()
        throw new UnprocessableEntityException(errors)
      case 404:
        throw new NotFoundException
      default:
        throw new ApiServiceException(response.status)
    }
  }

  protected toFormData(data: {[key: string]: string | Blob | number | boolean | undefined}): FormData {
    const formData = new FormData()
    for (const [key, value] of Object.entries(data)) {
        if(value !== undefined)
          formData.append(key, value instanceof Blob ? value : value.toString())
    }
    return formData
  }
}