import { Loader } from 'lucide-react'

const ChatInput = ({ handelSend, setInput, input, loader }) => {

  const handelKewDown = (e) => {
    if (e.key === 'Enter' && !e.shiftkey) {
      e.preventDefault()
      handelSend()
    }
  }

  return (
    <div className='fixed bottom-0 p-2 flex items-center gap-3 md:left-[350px]'>
      <input type="text"
        value={input}
        onKeyDown={handelKewDown}
        onChange={(e) => setInput(e.target.value)}
        placeholder={loader ? 'Generating...' : 'Ask anything...'}
        className='md:w-[570px] w-[270px] p-3 rounded-md bg-gray-800 text-white outline-none text-whit border border-gray-700 focus:border-blue-500'
      />

      <button
        onClick={handelSend}
        disabled={loader || !input.trim()}
        className='px-6 py-3 rounded-md bg-green-600 disabled:cursor-not-allowed hover:bg-green-700 text-white transition'>{loader ? <Loader className='animate-spin' /> : 'Send'}</button>
    </div>
  )
}

export default ChatInput