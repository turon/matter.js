/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { MatterFlowError } from "#general";
import { TypeFromSchema } from "#types";
import { SecureMessageType } from "../../securechannel/SecureChannelMessages.js";
import { SecureChannelMessenger } from "../../securechannel/SecureChannelMessenger.js";
import { TlvCaseSigma1, TlvCaseSigma2, TlvCaseSigma2Resume, TlvCaseSigma3 } from "./CaseMessages.js";

export class CaseServerMessenger extends SecureChannelMessenger {
    async readSigma1() {
        const { payload } = await this.nextMessage("CASE Sigma1", SecureMessageType.Sigma1);
        return { sigma1Bytes: payload, sigma1: TlvCaseSigma1.decode(payload) };
    }

    sendSigma2(sigma2: TypeFromSchema<typeof TlvCaseSigma2>) {
        return this.send(sigma2, SecureMessageType.Sigma2, TlvCaseSigma2);
    }

    sendSigma2Resume(sigma2Resume: TypeFromSchema<typeof TlvCaseSigma2Resume>) {
        return this.send(sigma2Resume, SecureMessageType.Sigma2Resume, TlvCaseSigma2Resume);
    }

    async readSigma3() {
        const { payload } = await this.nextMessage("CASE Sigma3", SecureMessageType.Sigma3);
        return { sigma3Bytes: payload, sigma3: TlvCaseSigma3.decode(payload) };
    }
}

export class CaseClientMessenger extends SecureChannelMessenger {
    sendSigma1(sigma1: TypeFromSchema<typeof TlvCaseSigma1>) {
        return this.send(sigma1, SecureMessageType.Sigma1, TlvCaseSigma1);
    }

    async readSigma2() {
        const {
            payload,
            payloadHeader: { messageType },
        } = await this.nextMessage("CASE Sigma2 or Sigma2Resume");
        switch (messageType) {
            case SecureMessageType.Sigma2:
                return { sigma2Bytes: payload, sigma2: TlvCaseSigma2.decode(payload) };
            case SecureMessageType.Sigma2Resume:
                return { sigma2Resume: TlvCaseSigma2Resume.decode(payload) };
            default:
                throw new MatterFlowError(
                    `Received unexpected message type while expecting CASE Sigma2: ${messageType}, expected: ${SecureMessageType.Sigma2} or ${SecureMessageType.Sigma2Resume}`,
                );
        }
    }

    sendSigma3(sigma3: TypeFromSchema<typeof TlvCaseSigma3>) {
        return this.send(sigma3, SecureMessageType.Sigma3, TlvCaseSigma3);
    }
}