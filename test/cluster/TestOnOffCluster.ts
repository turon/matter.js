/**
 * Copyright 2022 Project CHIP Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Cluster, Attributes, Commands, Events } from "../../src/cluster/Cluster.js";
import { OnOffCluster } from "../../src/cluster/OnOffCluster.js";
import { BitSchema } from "../../src/matter.js";

type TestEntry<FeaturesT extends BitSchema, AttributesT extends Attributes, CommandsT extends Commands, EventsT extends Events> = {
    name: string,
    cluster: Cluster<FeaturesT,AttributesT,CommandsT,EventsT>,
    tlv: string,
    command: CommandsT,
}

const theTestTlvVector = [
    {
        name: "OnOffCluster: command OnOff.on",
        cluster: OnOffCluster,
        tlv: "15240201240300280418",
        //jsObj: { field2: 1, field3: 0, field4: false },
    },
]

function testClusterSchema(testEntry:TestEntry<any,any,any,any>)
{
    const { name, cluster, tlv, command } = testEntry
    const testName = "TestClusterSchema " + name

    it(testName, () => {
    })

}

describe("Test Clusters", () => {
    theTestTlvVector.forEach(testEntry => {
        testClusterSchema(testEntry)
    })
})
