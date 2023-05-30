import { WebcamImage } from "ngx-webcam";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BsModalRef } from "ngx-bootstrap/modal";
import { CertificateServiceServiceProxy } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-CameraModal",
  templateUrl: "./CameraModal.component.html",
  styleUrls: ["./CameraModal.component.css"],
})
export class CameraModalComponent implements OnInit {
  @Output() onSave = new EventEmitter<string>();
  constructor(
    public bsModalRef: BsModalRef,
    private _certificateServiceServiceProxy: CertificateServiceServiceProxy
  ) {}

  ngOnInit() {}
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  saving = false;
  sysImage = "";
  base64Image = "";
  public getSnapshot(): void {
    this.trigger.next(void 0);
  }
  public resetSnapshot(): void {
    this.sysImage = "";
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage?.imageAsDataUrl;
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
  save() {
    this.saving = true;

    var file = this.convertWebCameTyoFile();
    this._certificateServiceServiceProxy
      .uploadCameraImage({ data: file, fileName: file.name })
      .subscribe((result) => {
        this.onSave.emit(result.path);
        this.saving = false;
        this.bsModalRef.hide();
      });
  }
  convertWebCameTyoFile() : File {
    const arr = this.webcamImage.imageAsDataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], "capture.jpg", {
      type: "image/jpg",
    });
  }
}
