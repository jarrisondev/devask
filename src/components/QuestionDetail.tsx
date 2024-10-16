"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, MessageCircle, Eye, Clock, User } from "lucide-react";
import { Question, Reply } from "@/types";
import { getRelativeString } from "@/lib/dateUtils";
import ContentWithCodeBlocks from "@/lib/ContentWithCodeBlocks";

const ReplyItem = ({ reply }: { reply: Reply }) => (
  <div className="border-t border-gray-200 pt-4 mt-4">
    <ContentWithCodeBlocks content={reply.content} />
    <div className="flex items-center text-sm text-gray-500 mt-2">
      <User className="h-4 w-4 mr-1" />
      <span className="mr-4">{reply.author}</span>
      <Clock className="h-4 w-4 mr-1" />
      <span>{getRelativeString(reply.createdAt)}</span>
    </div>
  </div>
);

const QuestionDetail = ({ question }: { question: Question }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span className="flex items-center mr-4">
          <Eye className="h-4 w-4 mr-1" />
          {question.views} vistas
        </span>
        <span className="flex items-center mr-4">
          <MessageCircle className="h-4 w-4 mr-1" />
          {question.answers} respuestas
        </span>
        <span className="flex items-center mr-4">
          <Clock className="h-4 w-4 mr-1" />
          {getRelativeString(question.timeAgo)}
        </span>
        <span className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          {question.author}
        </span>
      </div>
      <ContentWithCodeBlocks content={question.content} />
      <div className="flex items-center justify-between mt-4">
        <div className="space-x-2">
          {question.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-300">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className={`${upvoted ? "bg-green-100 text-green-600" : ""}`} onClick={() => setUpvoted(!upvoted)}>
            <ArrowUp className="h-4 w-4 mr-1" />
          </Button>
          <Button variant="outline" size="sm" className={`${downvoted ? "bg-red-100 text-red-600" : ""}`} onClick={() => setDownvoted(!downvoted)}>
            <ArrowDown className="h-4 w-4 mr-1" />
          </Button>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{question.answers} respuestas</h2>
      {question?.replies?.map((reply) => (
        <ReplyItem key={reply.id} reply={reply} />
      ))}
    </div>
  );
};

export default QuestionDetail;
