import { useEffect, useRef, useState } from 'react';
import sendMessage from '../services/chatApi';
import ChatInput from './ChatInput';
import { Loader } from 'lucide-react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownRenderer from './MarkdownRenderer';

const MessageBubble = () => {

  const [message, setMessage] = useState([])
  const [input, setInput] = useState('')
  const [loader, setLoader] = useState(false)
  const messageEndRef = useRef(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [message])

  const handelSend = async () => {
    if (!input.trim()) return
    setLoader(true)

    const newMessage = [...message, { role: 'user', content: input }];
    setMessage(newMessage)

    try {
      const data = await sendMessage(input, newMessage)

      setMessage((prev) => [...prev, {
        role: 'assistant',
        content: data.reply
      }])
    }
    catch (err) {
      console.error(err);
      setMessage((prev) => [
        ...prev,
        { role: "bot", content: "❌ Error: Server down ya API fail ho gaya" },
      ]);
    }
    finally {
      setLoader(false)
      setInput('')
    }
  }

  

  return (
    <>
      <div className='p-4 overflow-y-scroll max-h-[520px] hide-scrollbar'>

        {
          message.length === 0 && (
            <div className='flex justify-center items-center h-[400px] text-center text-white text-2xl'>
              Hey, there !<br /> How can i assist you
            </div>
          )
        }
        {
          message.map((m, i) => (
            <div key={i} className={`flex  ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-lg my-2 md:max-w-[70%]  whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
                <MarkdownRenderer content={m.content}
                // components={{
                //   h1: ({ children }) => <h1 className="text-xl font-bold mt-2 mb-2">{children}</h1>,
                //   h2: ({ children }) => <h2 className="text-lg font-semibold mt-2 mb-2">{children}</h2>,
                //   p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
                //   ul: ({ children }) => <ul className="list-disc ml-5 mb-2">{children}</ul>,
                //   li: ({ children }) => <li className="mb-1">{children}</li>,
                //   pre: ({ children }) => (
                //     <pre className="bg-black/60 p-3 rounded-md overflow-x-auto">
                //       {children}
                //     </pre>
                //   ),
                //   code: ({ children }) => (
                //     <code className="bg-black/40 px-1 rounded text-green-300">
                //       {children}
                //     </code>
                //   ),
                // }}

                >
                  {/* {m.content} */}
                </MarkdownRenderer>
              </div>
            </div>
          ))
        }

        {
          loader && (
            <div className='px-4 py-2 rounded-lg bg-white text-black flex items-center gap-3 w-fit'>
              <Loader className='animate-spin' />
              Loading...
            </div>
          )
        }
        <div ref={messageEndRef}></div>
      </div>
      <ChatInput handelSend={handelSend} setInput={setInput} input={input} loader={loader} />
    </>
  )
}

export default MessageBubble