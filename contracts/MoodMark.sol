// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MoodMark
 * @notice A Web3 dApp smart contract to record and look up moods on-chain.
 */
contract MoodMark {
    /// @notice The allowed mood options.
    enum Mood {
        Happy,    // 0 😊
        Okay,     // 1 😐
        Sad,      // 2 😔
        Excited,  // 3 🤩
        Tired,    // 4 😴
        Cool,     // 5 😎
        Angry,    // 6 😡
        Loved,    // 7 🥰
        Anxious   // 8 😰
    }

    /// @dev Internal record storing the mood and whether it has been set.
    struct UserMood {
        Mood mood;
        bool hasMood;
    }

    /// @notice Mapping from user wallet address to their recorded mood.
    mapping(address => UserMood) private _userMoods;

    /// @notice Emitted whenever a user saves or updates their mood.
    event MoodUpdated(address indexed user, Mood mood);

    /// @notice Custom error for invalid mood inputs.
    error InvalidMood();

    /**
     * @notice Allows the connected wallet to save or update its mood.
     * @param mood The numeric value representing the mood (0 to 8).
     */
    function setMood(uint8 mood) external {
        if (mood > uint8(Mood.Anxious)) {
            revert InvalidMood();
        }

        Mood selectedMood = Mood(mood);
        _userMoods[msg.sender] = UserMood({
            mood: selectedMood,
            hasMood: true
        });

        emit MoodUpdated(msg.sender, selectedMood);
    }

    /**
     * @notice Returns the saved mood and whether the wallet has selected a mood.
     * @param user The address of the user wallet to inspect.
     * @return mood The saved mood enum value. Defaults to Happy(0) if unset.
     * @return hasMood True if the wallet has saved a mood, false otherwise.
     */
    function getMood(address user) external view returns (Mood mood, bool hasMood) {
        UserMood memory record = _userMoods[user];
        return (record.mood, record.hasMood);
    }
}
