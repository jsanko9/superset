/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {
  ControlSetItem,
  CustomControlConfig,
  sharedControls,
  InfoTooltipWithTrigger,
} from '@superset-ui/chart-controls';
import { t, useTheme, validateNonEmpty } from '@superset-ui/core';
import React from 'react';
import { CodeEditor } from '../../components/CodeEditor/CodeEditor';
import { ControlHeader } from '../../components/ControlHeader/controlHeader';
import { debounceFunc } from '../../consts';

interface HelpersCustomControlProps {
  value: string;
}

const HelpersTemplateControl = (
  props: CustomControlConfig<HelpersCustomControlProps>,
) => {
  const theme = useTheme();

  const defaultValue = String(
    props?.value ? props?.value : props?.default ? props?.default : '{}',
  );

  return (
    <div>
      <ControlHeader>
        <div>
          {props.label}
          <InfoTooltipWithTrigger
            iconsStyle={{ marginLeft: theme.gridUnit }}
            tooltip={t(
              'You need to configure HTML sanitization to use Helpers.',
            )}
          />
        </div>
      </ControlHeader>
      <CodeEditor
        theme="dark"
        mode="javascript"
        value={props.value}
        defaultValue={defaultValue}
        onChange={source => {
          debounceFunc(props.onChange, source || '');
        }}
      />
    </div>
  );
};

export const handlebarsHelpersControlSetItem: ControlSetItem = {
  name: 'HelpersTemplate',
  config: {
    ...sharedControls.entity,
    type: HelpersTemplateControl,
    label: t('Handlebars Helpers'),
    description: t('Handlebar Helpers to be registered'),
    default: '{}',
    isInt: false,
    renderTrigger: true,
    validators: [validateNonEmpty],
    mapStateToProps: ({ controls }) => ({
      value: controls?.handlebars_template?.value,
    }),
  },
};
