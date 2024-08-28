import { Html5QrcodeScanner } from 'html5-qrcode'
import type { Html5QrcodeScanType } from 'html5-qrcode/esm/core'
import type { Html5QrcodeCameraScanConfig, Html5QrcodeConfigs } from 'html5-qrcode/esm/html5-qrcode'
import React, { memo, useEffect } from 'react'
import type { ScanInputTypes } from './Formik/types'

const qrcodeRegionId = 'html5qr-code-full-region'

interface Html5QrcodeScannerConfig extends Html5QrcodeCameraScanConfig, Html5QrcodeConfigs {
  rememberLastUsedCamera?: boolean | undefined
  supportedScanTypes?: Array<Html5QrcodeScanType> | []
}

type Props = {
  onChange: (value: string) => void
  onError?: (value: string) => void
  verbose?: boolean
  fps?: number
} & Html5QrcodeScannerConfig &
  ScanInputTypes

const Scanner = ({ onChange, onError, verbose, scanType, ...config }: Props & typeof defaultProps) => {
  useEffect(() => {
    if (scanType === 'barcode') {
      config.qrbox = { width: 400, height: 150 }
    } else {
      config.qrbox = { width: 250, height: 250 }
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose)

    html5QrcodeScanner.render(onChange, onError)

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner. ', error)
      })
    }
  }, [])

  return <div id={qrcodeRegionId} />
}

const defaultProps = {
  fps: 10,
  supportedScanTypes: [],
  verbose: false
}

Scanner.defaultProps = defaultProps

export default memo(Scanner)
