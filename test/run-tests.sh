# Copyright 2014 Palantir Technologies, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

echo "Checking tslint binary"
# make sure calling tslint with no args exits correctly.
node bin/tslint &> /dev/null
if [ $? != 1 ]
then
  echo "tslint with no args did not exit with a 1"
  exit 1
fi



# make sure calling tslint with a good file exits correctly.
node bin/tslint -f src/configuration.ts
if [ $? != 0 ]
then
  echo "tslint with a good file did not exit with a 0"
  exit 1
fi


# make sure calling tslint with a bad file exits correctly
node bin/tslint -f test/files/rules/ban.test.ts -c tslint.json &> /dev/null
if [ $? != 2 ]
then
  echo "tslint with a bad file did not exit with a 2"
  exit 1
fi

echo "Done!"
