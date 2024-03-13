import React, { useState } from 'react';
import { PedalItem } from '../src/api/toneTrackerApi';

type PedalSettingsFormProps = {
  pedal: PedalItem;
  onSave: (updatedPedal: PedalItem) => void;
};

const PedalSettingsForm: React.FC<PedalSettingsFormProps> = ({ pedal, onSave }) => {
  const [updatedPedal, setUpdatedPedal] = useState<PedalItem>(pedal);

  const handleDialSettingChange = (
    dialIndex: number,
    settingIndex: number,
    settingName: string
  ) => {
    const updatedDials = updatedPedal.dials ? [...updatedPedal.dials] : [];
    if (updatedDials[dialIndex]) {
      const updatedSettings = [...updatedDials[dialIndex].settings];
      updatedSettings[settingIndex].settingName = settingName;
      updatedDials[dialIndex].settings = updatedSettings;
    }

    setUpdatedPedal((prev) => ({
      ...prev,
      dials: updatedDials,
    }));
  };

  const handleToggleSettingChange = (
    toggleIndex: number,
    settingIndex: number,
    settingName: string
  ) => {
    const updatedToggles = updatedPedal.toggles ? [...updatedPedal.toggles] : [];
    if (updatedToggles[toggleIndex]) {
      const updatedSettings = [...updatedToggles[toggleIndex].settings];
      updatedSettings[settingIndex].settingName = settingName;
      updatedToggles[toggleIndex].settings = updatedSettings;
    }

    setUpdatedPedal((prev) => ({
      ...prev,
      toggles: updatedToggles,
    }));
  };

  const handleSave = () => {
    onSave(updatedPedal);
  };

  return (
    <div>
      <h2>{updatedPedal.name} Settings</h2>

      <h3>Dials</h3>
      {updatedPedal.dials?.map((dial, dialIndex) => (
        <div key={dial.name}>
          <h4>{dial.name}</h4>
          {dial.settings.map((setting, settingIndex) => (
            <div key={setting.settingName}>
              <label>
                Setting {settingIndex}:
                <input
                  type="text"
                  value={setting.settingName}
                  onChange={(e) =>
                    handleDialSettingChange(dialIndex, settingIndex, e.target.value)
                  }
                />
              </label>
            </div>
          ))}
        </div>
      ))}

      <h3>Toggles</h3>
      {updatedPedal.toggles?.map((toggle, toggleIndex) => (
        <div key={toggle.name}>
          <h4>{toggle.name}</h4>
          {toggle.settings.map((setting, settingIndex) => (
            <div key={setting.settingName}>
              <label>
                Setting {settingIndex}:
                <input
                  type="text"
                  value={setting.settingName}
                  onChange={(e) =>
                    handleToggleSettingChange(toggleIndex, settingIndex, e.target.value)
                  }
                />
              </label>
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default PedalSettingsForm;
