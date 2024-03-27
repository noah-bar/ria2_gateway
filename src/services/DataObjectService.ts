import { ApiService } from "./ApiService";

type UploadProps = {
  file: Blob | undefined,
  name: string
}

export class DataObjectService extends ApiService {
  public async upload(props: UploadProps) {
    const endpoint = `${this.apiUrl}/upload`
    const response = await fetch(endpoint, {
      ...this.requestInit,
      method: "POST",
      body: this.toFormData(props)
    })

    if(!response.ok) await this.throwException(response)
    return await response.json() as { name: string }
  }

  public async publish(name: string) {
    const endpoint = `${this.apiUrl}/publish/${name}`
    const response = await fetch(endpoint, {
      ...this.requestInit,
      method: "GET",
    })

    if(!response.ok) await this.throwException(response)
    return await response.json() as { url: string }
  }

}
