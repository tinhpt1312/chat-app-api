import { InjectRepository } from '@nestjs/typeorm';
import { Message, User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/chat.dto';

export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async saveMessage(message: CreateMessageDto) {
    // Lưu tin nhắn vào DB
  }

  async getMessages(roomId: string) {
    // Lấy lịch sử chat
  }

  async markAsRead(messageId: string) {
    // Đánh dấu đã đọc
  }
}
