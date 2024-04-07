import React, { useRef, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Box, Popper } from "@mui/material";
import { Blue, GrayColors } from "../../utils/constants/colorPallete";
import IconButton from "@mui/material/IconButton";
import { StyledInputElement } from "./styledComponents";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import useSendMessage from "../../utils/hooks/useSendMessage";
import { useAppSelector } from "../../store/hooks";
import { getLoggedUser } from "../../store/slices/AuthSlice";
import { ChatRoomType } from "../../utils/types/ChatRoom";

interface InputEmojiFieldProps {
  currentRoom: ChatRoomType;
}
const InputEmojiField = ({ currentRoom }: InputEmojiFieldProps) => {
  const currentUser = useAppSelector(getLoggedUser);

  const [inputValue, setInputValue] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLElement | null>(null);

  const sendMessage = useSendMessage();

  const handleOpenEmojiPicker = () => {
    setIsEmojiPickerOpen((prevValue) => !prevValue);
  };

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setInputValue(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
  };

  return (
    <ClickAwayListener onClickAway={() => setIsEmojiPickerOpen(false)}>
      <div>
        <Box ref={inputRef} sx={{ paddingTop: "16px" }}>
          <StyledInputElement
            sx={{
              border: `1px solid ${GrayColors.Gray5}`,
              borderRadius: "6px",
              padding: "8px",
              maxHeight: "500px",
            }}
            multiline
            disableUnderline
            endAdornment={
              <Box style={{ display: "flex", gap: "16px", marginRight: "4px" }}>
                <IconButton
                  disableRipple
                  sx={{ padding: "0" }}
                  onClick={handleOpenEmojiPicker}
                >
                  <InsertEmoticonOutlinedIcon
                    sx={{
                      color: GrayColors.Gray4,
                      "&:hover": {
                        color: Blue.PrimaryBlue,
                      },
                    }}
                  />
                </IconButton>
                <IconButton
                  disableRipple
                  sx={{ padding: "0" }}
                  onClick={() => {
                    sendMessage(inputValue, currentUser, currentRoom);
                    setInputValue("");
                  }}
                >
                  <SendIcon
                    sx={{
                      color: GrayColors.Gray4,
                      "&:hover": {
                        color: Blue.PrimaryBlue,
                      },
                    }}
                  />
                </IconButton>
              </Box>
            }
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage(inputValue, currentUser, currentRoom);
                setInputValue("");
                event.preventDefault();
              }
            }}
            placeholder={"Type message"}
          />
        </Box>

        <Popper
          open={isEmojiPickerOpen}
          placement="top"
          disablePortal
          anchorEl={inputRef.current}
          style={{ zIndex: 10001 }}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [50, 0],
              },
            },
          ]}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            autoFocusSearch={false}
            emojiStyle={EmojiStyle.NATIVE}
          />
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default InputEmojiField;
