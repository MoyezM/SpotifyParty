import { Injectable, NgZone, OnInit } from '@angular/core';

declare global {
  interface Window {
    RTCPeerConnection: RTCPeerConnection;
    mozRTCPeerConnection: RTCPeerConnection;
    webkitRTCPeerConnection: RTCPeerConnection;
  }
}

@Injectable({
  providedIn: 'root'
})
export class IpService {

  localIp = sessionStorage.getItem('LOCAL_IP');
  private ipRegex = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);

  constructor(private zone: NgZone) {
    this.determineLocalIp();
  }

  private determineLocalIp() {
    window.RTCPeerConnection = this.getRTCPeerConnection();

    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel('');
    pc.createOffer().then(pc.setLocalDescription.bind(pc));

    pc.onicecandidate = (ice) => {
      this.zone.run(() => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
          return;
        }

        this.localIp = this.ipRegex.exec(ice.candidate.candidate)[1];
        sessionStorage.setItem('LOCAL_IP', this.localIp);

        pc.onicecandidate = () => {};
        pc.close();
      });
    };
  }

  private getRTCPeerConnection() {
    return window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection;
  }

  public getIp() {
    return this.localIp;
  }
}
